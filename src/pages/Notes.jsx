import React, { useEffect, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../store/authSlice';
import { Query } from 'appwrite';
import databaseService from '../appwrite/database';
import conf from '../conf/conf';
import Note from '../components/Note';
import NoteForm from '../components/NoteForm';
import AlertBox from '../components/AlertBox'
import NoteDeleteBox from '../components/NoteDeleteBox';
import { nanoid } from 'nanoid';

const Notes = () => {

  const [ isNotesFormVisible, setIsNotesFormVisible ] = useState(false)
  const [ notesList, setNotesList ] = useState([])
  const [ isNoteDeleteBoxOpen, setIsNoteDeleteBoxOpen] = useState(false)
  const [ noteId, setNoteId ] = useState(null)
  const [ alertMessage, setAlertMessage ] = useState(['',''])


  const isNavigationbarOpen = useSelector((state)=> state.account.menubarClicked)
  const notesStyle = isNavigationbarOpen ? 'hidden' : 'block'

  const dispatch = useDispatch()

  //local storage settings
  const authData = useSelector((state)=> state.auth.userData)
  if (!authData) {
    dispatch(logout())
  } 
  
  useEffect(()=>{
    const authData = JSON.parse(localStorage.getItem('authData'))
    if (authData){
      dispatch(login(authData))
    }
  },[])

  useEffect(()=>{
    localStorage.setItem('authData',JSON.stringify(authData))
  },[authData])


  

  function handleClick(){
    setIsNotesFormVisible((prev)=>!prev)
  }

  const fetchNotes = async () => {
      try {
        const query = [Query.equal('user_id', [authData.email || authData.providerUid]),Query.orderDesc("updated_on")];
        const allNotes = await databaseService.getAllDocuments(conf.appwriteNotesId, query);
        console.log('Fetched Notes:', allNotes);
        const { documents } = allNotes;
        if (documents.length != notesList){
          console.log('note list updated inside useeffect')
          setNotesList(documents);
        }
        
      } catch (error) {
        console.log('fetchNotes :: ', error);
      }
      console.log(notesList);
  };

 

  useEffect(() => {
    if (authData){
      fetchNotes();
    } 
  }, []);


  useEffect(()=>{
    const notesList = JSON.parse(localStorage.getItem('notesList'))
    if (notesList && notesList.length > 0){
      setNotesList(notesList)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem('notesList',JSON.stringify(notesList))
  },[notesList])

  



  return (
    <div className='min-h-screen pt-[12vh] pb-5 px-5 sm:px-10 relative'>
      <h2 className={`text-white text-lg sm:text-2xl  font-bold mb-5 ${notesStyle} sm:block`}>NOTES</h2>
      <div className={`h-auto flex justify-start gap-5 sm:gap-10 flex-wrap ${notesStyle} sm:flex`}>
        {
          notesList && 
          notesList.map((note)=>{
            const dateString = note.updated_on 
            const date = new Date(dateString);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = date.toLocaleDateString('en-US', options);
            return(
              <Note key={note.$id} 
                    id={note.$id} 
                    title={note.title || 'Note'} 
                    description={note.description} 
                    time={formattedDate} 
                    setNoteId={setNoteId}
                    setIsNoteDeleteBoxOpen={setIsNoteDeleteBoxOpen}  />
            )
          })
        }
      </div>



      <div onClick={handleClick} className=' fixed bottom-4  sm:bottom-[12vh] right-5 sm:right-10 cursor-pointer'>
        <AddCircleIcon  sx={{color:'yellow', fontSize: { xs: 50, sm: 60, md: 70,}} }/>
      </div>
      

      <NoteForm isNotesFormVisible={isNotesFormVisible} setIsNotesFormVisible={setIsNotesFormVisible} setNotesList={setNotesList} />
      <NoteDeleteBox 
        isNoteDeleteBoxOpen={isNoteDeleteBoxOpen} 
        setIsNoteDeleteBoxOpen={setIsNoteDeleteBoxOpen} 
        setNotesList={setNotesList} 
        noteId={noteId} 
        setAlertMessage={setAlertMessage}
      />
      <AlertBox message={alertMessage[0]} color={alertMessage[1]}/>
    </div>
  )
}

export default Notes

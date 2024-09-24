const conf = {
    appwriteUrl : import.meta.env.VITE_APP_APPWRITE_URL,
    appwriteProjectId: import.meta.env.VITE_APP_APPWRITE_PROJECT_ID,
    appwriteDatabaseId: import.meta.env.VITE_APP_APPWRITE_DATABASE_ID,
    appwriteBalanceAmountId : import.meta.env.VITE_APP_APPWRITE_BALANCEAMOUNT_ID ,
    appwriteNotesId: import.meta.env.VITE_APP_APPWRITE_NOTES_ID,
    appwriteBucketId:4
}


export const collectionConf = {
   
    appwriteHousingId : import.meta.env.VITE_APP_APPWRITE_HOUSING_ID,
    appwriteFoodId : import.meta.env.VITE_APP_APPWRITE_FOOD_ID,
    appwriteTransportationId : import.meta.env.VITE_APP_APPWRITE_TRANSPORTATION_ID,
    appwriteHealthcareId : import.meta.env.VITE_APP_APPWRITE_HEALTHCARE_ID,
    appwriteInsuranceId : import.meta.env.VITE_APP_APPWRITE_INSURANCE_ID,
    appwriteDebtsId : import.meta.env.VITE_APP_APPWRITE_DEBTS_ID,
    appwriteEducationId : import.meta.env.VITE_APP_APPWRITE_EDUCATION_ID,
    appwritePersonalId : import.meta.env.VITE_APP_APPWRITE_PERSONAL_ID,
    appwriteClothingId : import.meta.env.VITE_APP_APPWRITE_CLOTHING_ID,
    appwriteEntertainmentId : import.meta.env.VITE_APP_APPWRITE_ENTERTAINMENT_ID,
    appwriteOthersId : import.meta.env.VITE_APP_APPWRITE_OTHERS_ID
}

export default conf
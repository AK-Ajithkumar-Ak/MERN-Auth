export const formatDate= (datestring)=>{
    const date= new Date(datestring)
    if (isNaN(date.getTime())) {
     return "Invalid Date";   
    }

    return date.toLocaleString("en-US",{
        year:"numeric",
        month:"short", //digit= 02, long= February , narrow= f, numeric=2, short=feb
        day:"numeric",
        hour:"2-digit",
        minute:"2-digit",
        hour12:true,
    })
}


// console.log(formatDate("2023-04-11T15:02:52"));





import { UserTypeEnum } from "../user";


export function isValidDate(dateString: any): boolean {
    // Parse the input date string
    const parsedDate = new Date(dateString);
  
    // Check if the parsed date is a valid date and the input string is not NaN
    return !isNaN(parsedDate.getTime()) && parsedDate.toString() !== 'Invalid Date';
}

export function isValidPhoneNumber(phoneNumber: string) {
    console.log('helper.ts: isValidPhoneNumber()', phoneNumber);

    // Remove any non-numeric characters from the input
    const numericPhoneNumber = phoneNumber.replace(/\D/g, '');

    console.log('numericPhoneNumber', numericPhoneNumber)

    // Check if the numeric phone number starts with the Philippines country code and has the expected length
    if (numericPhoneNumber.startsWith('639') && numericPhoneNumber.length === 12) {
        // Extract the mobile network code from the remaining characters
        // const mobileNetworkCode = '0' + numericPhoneNumber.substring(2, 5);
        // console.log('mobileNetworkCode', mobileNetworkCode)

        // if(validNetworkCodes.includes(mobileNetworkCode)){
        //     return true
        // }
        return true
    }

    // If any of the checks fail, the phone number is considered invalid
    return false;
}


export const getAge = (birthDate: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


export const isUserLGU = (type: UserTypeEnum): boolean => {
    if(type === UserTypeEnum.LGU_Casual || type === UserTypeEnum.LGU_Job_Order || type === UserTypeEnum.LGU_Regular){
        return true 
    }
    return false
}


export const isUserACDV = (type: UserTypeEnum): boolean => {
    if(type === UserTypeEnum.ACDV_BART || type === UserTypeEnum.ACDV_CSO || type === UserTypeEnum.ACDV_PO || type === UserTypeEnum.ACDV_INDIVIDUAL){
        return true 
    }
    return false
}


function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
}

export function formatDate(date: Date) {
    return (
        [
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
            date.getFullYear() % 100,
        ].join('-') +
        ' ' +
        [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
        ].join(':')
    );
}
  
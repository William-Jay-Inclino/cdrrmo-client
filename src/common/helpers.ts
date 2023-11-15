// import { ISingleSelect } from "@/common/types/forms"

// export const getEnumKey = (p: {enumVal: number, enumType: any}) :string => {
//     let enumKey = Object.keys(p.enumType)[Object.values(p.enumType).indexOf(p.enumVal)]
//     return enumKey
// }


// used in forms for single select
// constant is an enum
// export const constantToSingleSelect = (constant: any): ISingleSelect[] => {

//     const items: ISingleSelect[] = []

//     for(let item in constant){
//         items.push({
//             id: constant[item]['id'],
//             text: constant[item]['text'],
//             selected: false,
//         })
//     }

//     items[0].selected = true

//     return items
// }


export function isValidDate(dateString: any): boolean {
    // Parse the input date string
    const parsedDate = new Date(dateString);
  
    // Check if the parsed date is a valid date and the input string is not NaN
    return !isNaN(parsedDate.getTime()) && parsedDate.toString() !== 'Invalid Date';
}

const validNetworkCodes = [
    // Globe Telecom
    '0817', '0905', '0906', '0915', '0916', '0917', '0925', '0926', '0927', '0935', '0936', '0937', '0938', '0994', '0996',
    
    // Smart Communications (includes Talk 'N Text, TNT)
    '0813', '0900', '0907', '0908', '0909', '0910', '0911', '0912', '0913', '0914', '0918', '0919', '0920', '0921', '0928',
    '0929', '0930', '0931', '0939', '0946', '0947', '0948', '0949', '0950', '0951', '0953', '0954', '0955', '0956', '0961',
    '0963', '0965', '0966', '0967', '0968', '0969', '0970', '0981', '0989', '0992', '0998', '0999'
];

export function isValidPhoneNumber(phoneNumber: string) {
    console.log('helper.ts: isValidPhoneNumber()', phoneNumber);

    // Remove any non-numeric characters from the input
    const numericPhoneNumber = phoneNumber.replace(/\D/g, '');

    console.log('numericPhoneNumber', numericPhoneNumber)

    // Check if the numeric phone number starts with the Philippines country code and has the expected length
    if (numericPhoneNumber.startsWith('63') && numericPhoneNumber.length === 12) {
        // Extract the mobile network code from the remaining characters
        const mobileNetworkCode = '0' + numericPhoneNumber.substring(2, 5);
        console.log('mobileNetworkCode', mobileNetworkCode)

        if(validNetworkCodes.includes(mobileNetworkCode)){
            return true
        }

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







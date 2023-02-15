// import { storage as firebaseStorage } from 'firebase';
// import ENV from '../env';

export const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}

/* export const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
export const RESET_FORM = 'RESET_FORM';
export const SET_EDIT_MODE = 'SET_EDIT_MODE';

export const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        let updatedFormIsValid = true;
        const updatedValues = {
            ...state.inputValues,
            [action.inputLabel]: action.value
        };
        const updatedInputValidities = {
            ...state.inputValidities,
            [action.inputLabel]: action.isValid
        };
        const updatedTouched = {
            ...state.touched,
            [action.inputLabel]: true
        };
        for (let key in updatedInputValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedInputValidities[key];
        }
        return {
            inputValues: updatedValues,
            inputValidities: updatedInputValidities,
            touched: updatedTouched,
            formIsValid: updatedFormIsValid
        }
    } else if (action.type === RESET_FORM) {
        return action.initialState
    } else if (action.type === SET_EDIT_MODE) {
        return action.editState
    }
    return state;
}

export const placesSearch = async (searchTerm) => {
    //const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const proxyurl = 'https://thawing-wave-98227.herokuapp.com/';
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${ENV.googleApiKey}&input=${searchTerm}&location=${-1.2855641},${36.8148359}&radius=5000`;
    try {
        const result = await fetch(proxyurl + apiUrl, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        const json = await result.json();
        console.log(json);
        return json.predictions;
    } catch (err) {
        console.log(err);
    }
};

export const fetchLatLng = async (searchTerm) => {
    //const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const proxyurl = 'https://thawing-wave-98227.herokuapp.com/'
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchTerm}&key=${ENV.googleApiKey}`;
    try {
        const response = await fetch(proxyurl + apiUrl, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        if (!response.ok) {
            console.log(response);
            //throw new Error('Something went wrong. Try again later.');
        }
        const resData = await response.json();
        return resData.results[0].geometry.location;
    } catch (err) {
        console.log(err);
    }
}

export const uploadImage = async (imageUri, firebaseLocation) => {
    try {
        //console.log(imageUri);
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const imageRef = firebaseStorage().ref(firebaseLocation);
        await imageRef.put(blob);
        const downloadUrl = await imageRef.getDownloadURL();
        return downloadUrl
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
}

export const getProImageUrl = async (proId, category) => {
    let proCategory;
    if (category === "IT" || category === "Pest Control") {
        proCategory = category;
    } else {
        proCategory = category.toLowerCase()
    }
    let imageRef, proImageUrl
    try {
        imageRef = firebaseStorage().ref(`images/pros/${proCategory}/${proId}/passport-img.jpg`);
        proImageUrl = await imageRef.getDownloadURL();
    } catch (err) {
        if (err.code_ === "storage/object-not-found") {
            try {
                imageRef = firebaseStorage().ref(`images/pros/${proCategory}/${proId}/passport-img.jpeg`);
                proImageUrl = await imageRef.getDownloadURL();
            } catch (err) {
                if (err.code_ === "storage/object-not-found") {
                    try {
                        imageRef = firebaseStorage().ref(`images/pros/${proCategory}/${proId}/passport-img.png`);
                        proImageUrl = await imageRef.getDownloadURL();
                    } catch (err) {
                        console.log(err);
        
                        throw new Error(err.message);
                    }
                } else {
    
                    throw new Error(err.message);
                }
            }
        } else {
            throw new Error(err.message);
        }
    }
    return proImageUrl;
} */
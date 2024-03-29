export const backURL = 'https://server.form3a.net/';
//export const backURL = 'http://localhost:4003/';

//  export const backURL = 'http://192.168.68.13:4003/';
// https://server.form3a.net/
// http://localhost:4003/

export interface Work {
    _id: string,
    title: string,
    category: string,
    template:string,
    description1: string,
    photoLink0: string,
    description2: string,
    photoLink1: string,
    description3: string,
    photoLink2: string,
    photoLink3: string,
    photoLink4: string,
    description4: string,
    photoLink5: string,
    featured: boolean,

    photoLink6: string;
    photoLink7: string;
    photoLink8: string;
    photoLink9: string;
    photoLink10: string;
    photoLink11: string;
    photoLink12: string;
    carousel0: string[];
    carousel1: string[];
    __v: number
}

export interface Team {
    _id: string,
    name: string,
    designation: string,
    picLink: string,
    priority: string,
    __v: number
}

export interface Story {
    _id: string,
    title: string,
    text1: string,
    location: string,
    year: string,
    image1: string,
    text2: string,
    text3: string,
    text4: string,
    image2: string,
    links: object[]
    __v: string
}

export const placeHolderThumb = "../../../../assets/images/img-placeholder.png";

export interface LoginDTO{
    userName: string;    
    password: string;
}

export interface MenuItem{
    id  ?: number;
    title: string;
    route: string;
}

export interface ResponseDTO{
    success: boolean;
    message: string;
}

export interface MenuDTO{
    id    : number;
    title : string
    route : String
}

export interface ResponseDetailLoginDTO extends ResponseDTO{
    idUser     : number;
    token      : string;    
    userName   : string;
    defaultUrl : string;
    menu       : MenuDTO[];
}
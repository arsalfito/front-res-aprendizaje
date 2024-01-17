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
    documento  : string;
    defaultUrl : string;
    menu       : MenuDTO[];
}

export interface AsignaturaDTO{
    id    : number;
    codigo: string;
    nombre: string;
    estado: boolean;
}

export interface CriteriosEvaluacionDTO{
    id                            : number;
    codigo                        : string;
    criterio                      : string;
    estado                        : boolean;
    idPrograma                    : number;
    idCriterioEvaluacionAsignatura: number;
}

export interface ResultadoAprendizajeDTO{
    id         : number;
    codigo     : string;
    resultado  : string;
    estado     : boolean;
    idPrograma : number;
    idDimension: number;
    dimension  : string;
}

export interface CriteriosEvaluacionAsignaturaDTO{
    id                     : number;
    estado                 : boolean;
    idAsignatura           : number;
    resultadoAprendizajeDTO: ResultadoAprendizajeDTO;    
    criteriosEvaluacionDTO : CriteriosEvaluacionDTO;
}

export interface GrupoDTO{
    id          : number;
    codigo      : string;
    periodo     : string;
    cerrado     : boolean;
    idAsignatura: number;
    idProfesor  : number;
}

export interface ProgramaDTO{
    id    : number;
    nombre: string;
    perfil: string;
}

export interface EstudianteGrupoDTO{
    idEstudianteGrupo             : number;	
	idCriterioEvaluacionAsignatura: number;
    idCalificacion                : number;
    idEstudiante                  : number;
    idGrupo                       : number;
    codigo                        : string;
    nombre                        : string;
    calificacion                  : number;
	definitiva                    : number;
}
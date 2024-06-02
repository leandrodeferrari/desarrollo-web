export interface Empleado {
    id: number;
    nombre: string;
    apellido: string;
    documento: number;
    categoria: String;
    fecha_nacimiento: Date;
    fecha_ingreso: Date;
    activo: boolean;
}

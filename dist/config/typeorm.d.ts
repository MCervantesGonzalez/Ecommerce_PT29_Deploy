import { DataSource } from 'typeorm';
declare const _default: (() => {
    type: string;
    host: string | undefined;
    port: number;
    username: string | undefined;
    password: string | undefined;
    database: string | undefined;
    autoLoadEntities: boolean;
    synchronize: boolean;
    logging: boolean;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    type: string;
    host: string | undefined;
    port: number;
    username: string | undefined;
    password: string | undefined;
    database: string | undefined;
    autoLoadEntities: boolean;
    synchronize: boolean;
    logging: boolean;
}>;
export default _default;
export declare const AppDataSource: DataSource;

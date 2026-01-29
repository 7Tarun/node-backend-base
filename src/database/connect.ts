import { DataSource } from "typeorm";
const {
  DB_TYPE,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_SYNC,
  DB_LOG,
  DB_MIGRATION,
} = process.env;
const { MODE } = process.env;
const {
  ACTIVITY_DB_TYPE,
  ACTIVITY_DB_HOST,
  ACTIVITY_DB_PORT,
  ACTIVITY_DB_USERNAME,
  ACTIVITY_DB_PASSWORD,
  ACTIVITY_DB_NAME,
  ACTIVITY_DB_SYNC,
  ACTIVITY_DB_LOG,
  ACTIVITY_DB_MIGRATION,
} = process.env;
const db_type: any = DB_TYPE;
const activity_db_type: any = ACTIVITY_DB_TYPE;

export const AppDataSource = new DataSource({
  type: db_type,
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: DB_SYNC === "true",
  migrationsRun: DB_MIGRATION === "true",

  logging: DB_LOG === "true",
  entities: [
    `**/entities/schema/app/**/*.entity${MODE == "local" ? ".ts" : ".js"}`,
  ],
  subscribers: [
    `**/entities/subscribers/*.subscriber${MODE == "local" ? ".ts" : ".js"}`,
  ],
});

export const ActivityDataSource = new DataSource({
  type: activity_db_type,
  host: ACTIVITY_DB_HOST,
  port: Number(ACTIVITY_DB_PORT),
  username: ACTIVITY_DB_USERNAME,
  password: ACTIVITY_DB_PASSWORD,
  database: ACTIVITY_DB_NAME,
  synchronize: ACTIVITY_DB_SYNC === "true",
  migrationsRun: ACTIVITY_DB_MIGRATION === "true",
  logging: ACTIVITY_DB_LOG === "true",
  entities: [
    `**/entities/schema/activity/**/*.entity${MODE == "local" ? ".ts" : ".js"}`,
  ],
});

export const Initialize = async () => {
  if (!AppDataSource.isInitialized) {
    try {
      await AppDataSource.initialize();
      console.log("App Database connected!!");
    } catch (error) {
      console.error("App Database failed to connect!!");
      console.log(error);
    }
  }
  if (!ActivityDataSource.isInitialized) {
    try {
      await ActivityDataSource.initialize();
      console.log("Activity Database connected!!");
    } catch (error) {
      console.error("Activity Database failed to connect!!");
    }
  }
};

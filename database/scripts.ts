import { createdb, dropdb } from 'pgtools';
import { config } from 'dotenv';
import { exec } from 'child_process';

config();
const {
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_HOST,
  DATABASE_NAME,
} = process.env;

const pgtoolsConfig = {
  user: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  port: DATABASE_PORT,
  host: DATABASE_HOST,
};

switch (process.argv[2]) {
  case 'db:create':
    createDatabase();
    break;
  case 'db:drop':
    dropDatabase();
    break;
  case 'db:migration:create':
    createMigration();
    break;
  default:
    console.log('Unrecognized command!');
}

async function createDatabase(): Promise<void> {
  try {
    await createdb(pgtoolsConfig, DATABASE_NAME);
    console.log(`Database ${DATABASE_NAME} has been sucсessfully created!`);
  } catch (error) {
    if (error.name === 'duplicate_database') {
      console.log(`Database ${DATABASE_NAME} already exists!`);
    } else {
      console.log(error.message);
    }
  }
}

async function dropDatabase(): Promise<void> {
  try {
    await dropdb(pgtoolsConfig, DATABASE_NAME);
    console.log(`Database ${DATABASE_NAME} has been sucсessfully dropped!`);
  } catch (error) {
    if (error.name === 'invalid_catalog_name') {
      console.log(`Database ${DATABASE_NAME} does not exist!`);
    } else {
      console.log(error.message);
    }
  }
}

function createMigration(): void {
  const migrationName = process.argv[3];

  if (!migrationName) {
    console.error('The migration name is required in the argument');
    process.exit(1);
  }

  exec(
    `npm run typeorm -- migration:create ./database/migrations/${migrationName}`,
    (error, stdout, _) => {
      if (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
      }

      console.log(stdout);
    },
  );
}
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import * as SQLite from 'expo-sqlite';
import migrations from '../../drizzle/migrations';

const expo = SQLite.openDatabaseSync('db.db');
export const db = drizzle(expo);

// 3. Export a hook to run migrations
export const useLibraryMigrations = () => {
  return useMigrations(db, migrations);
};

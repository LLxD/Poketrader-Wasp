/*
  Warnings:

  - You are about to drop the `Pokemon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `pokemonId` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `pokemonIdA` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `pokemonIdB` on the `Trade` table. All the data in the column will be lost.
  - Added the required column `tradeAreaA` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tradeAreaB` to the `Trade` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Pokemon";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Trade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "tradeAreaA" TEXT NOT NULL,
    "tradeAreaB" TEXT NOT NULL,
    CONSTRAINT "Trade_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Trade" ("id", "userId") SELECT "id", "userId" FROM "Trade";
DROP TABLE "Trade";
ALTER TABLE "new_Trade" RENAME TO "Trade";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

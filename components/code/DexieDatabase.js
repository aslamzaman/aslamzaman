
const DexieDatabase = () => {
    const str = `    export const insertBulkOrUpdate = async (tableName, data) => {
        try {
            const numInserted = await db.transaction('rw', db[tableName], async () => {
                return await db[tableName].bulkPut(data);
            });           
            return numInserted;
        } catch (error) {
            console.error(error);
            throw error;
        }
    
    };
    
    
    export const fetchOne = async (table, id) => {
        try {
            const response = await db[table].get(id);
            return { data: response || null };
        } catch (error) {
            console.log(error);
            return { data: null };
        }    
    }
    
    
    export const updateOne = async (table, data) => {
        try {
            await db[table].put(data);
            return { message: "Data updated successfully." };
        } catch (error) {          
            return { message: "Data updating error!" };
        }    
    }
    
    export const deleteOne = async (table, id) => {
        try {
            await db[table].delete(id);
            return { message: "Data deleted successfully." };
        } catch (error) {           
            return { message: "Data deleting error!" };
        }    
    }
    
    
    export const fetchAll = async (table) => {
        try {
            const response = await db[table].toArray();
            return { data: response || null };
        } catch (error) {
            return [];            
        }
    }
    
    
    //------------------------------------------------------------------------------------
    
    
    export const backup = async () => {
    
        try {
            const tables = db.tables;
            const data = await Promise.all(tables.map(async (table) => {
                return {
                    [table.name]: await db[table.name].toArray()
                }
            }))
            return Object.assign({}, ...data);
        } catch (error) {
            console.error("Error: " + error)
        }    
    }
    
    
    export const recover = async (datas) => {
    
        try {
            const tables = db.tables;
            const data = tables.map(async (table) => {
                await db[table.name].clear();
                const numInserted = await db[table.name].bulkAdd(datas[table.name]);
                console.log("Recovered all files");
            })
        } catch (error) {
            console.error("Error: " + error)
        }    
    }
    
  
    `;

    return str;
}

export default DexieDatabase;
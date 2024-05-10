export const MongoDb = () => {
    const url = "`${process.env.DATABASE_URL}`;";
    let str = `import mongoose from "mongoose";

export const Connect = async () => {
	try {
		const MONGODB_URI = ${url};
		const connection = await mongoose.connect(MONGODB_URI);
		console.log('MongoDB connected:', connection.connection.host);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
}
`;
return str;
}
module.exports = (mongoose) => {
	const Tutorial = mongoose.model(
		'tutorial',
		mongoose.Schema(
			{
				title: String,
				description: String,
				published: Boolean,
			},
			{
				timestamps: true,
			}
		)
	);
	// todo- for id in place of _id helper "toJSON" to be created
	return Tutorial;
};

const getOne = model => async (req, res) => {
  try {
    const doc = await model
      .find({ ...req.filter, _id: req.params.id })
      .lean()
      .exec();

    if (!doc) {
      return res.status(400).end();
    }

    res.status(200).json({ data: doc });
  } catch (err) {
    console.error(err);
    res.status(400).end();
  }
};

const getOneByName = model => async (req, res) => {
  try {
    const doc = await model
      .findOne({ name: req.body.name })
      .lean()
      .exec();

    if (!doc) {
      return res.status(400).end();
    }

    res.status(200).json({ data: doc });
  } catch (err) {
    console.error(err);
    res.status(400).end();
  }
};

const getMany = model => async (req, res) => {
  try {
    let docs;
    if (!req.query.name) {
      docs = await model
        .find({ ...req.filter })
        .lean()
        .exec();
    } else {
      docs = await model
        .find({ ...req.filter, name: req.query.name })
        .lean()
        .exec();
    }

    res.status(200).json({ data: docs });
  } catch (err) {
    console.error(err);
    res.status(400).end();
  }
};

const createOne = model => async (req, res) => {
  try {
    const doc = await model.create({ ...req.body });
    res.status(201).json({ data: doc });
  } catch (err) {
    console.error(err);
    res.status(400).end();
  }
};

const updateOne = model => async (req, res) => {
  try {
    const updatedDoc = await model
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .lean()
      .exec();

    if (!updatedDoc) {
      return res.status(400).end();
    }

    res.status(200).json({ data: updatedDoc });
  } catch (err) {
    console.error(err);
    res.status(400).end();
  }
};

const removeOne = model => async (req, res) => {
  try {
    const removed = await model.findByIdAndRemove(req.params.id);

    if (!removed) {
      return res.status(400).end();
    }

    return res.status(200).json({ data: removed });
  } catch (err) {
    console.error(err);
    res.status(400).end();
  }
};

const addPhoto = model => async (req, res) => {
  try {
    const photos = await model
      .findByIdAndUpdate(
        req.params.id,
        { $push: { photos: { $each: req.files.map(file => file.location) } } },
        { new: true }
      )
      .exec();

    if (!photos) {
      return res.status(400).end();
    }

    res.status(200).json({ data: photos });
  } catch (err) {
    console.error(err);
    res.status(400).end();
  }
};

const replacePhoto = model => async (req, res) => {
  try {
    const doc = await model
      .findByIdAndUpdate(
        req.params.id,
        { photos: [req.file.location] },
        { new: true }
      )
      .select("-password")
      .lean()
      .exec();
    if (!doc) {
      return res.sendStatus(400);
    }
    res.status(200).json({ data: doc });
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

module.exports.crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  getOneByName: getOneByName(model),
  createOne: createOne(model),
  // getPhotos: getPhotos(model),
  addPhoto: addPhoto(model),
  // removePhoto: removePhoto(model)
  replacePhoto: replacePhoto(model)
});

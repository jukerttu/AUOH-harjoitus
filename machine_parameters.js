const material_model = require('./parameters_model');

// Helpers
const material_data = (req) => {
    let data = {
        name: req.body.name,
        material: req.body.material,
        cutting: req.body.cutting,
        feed: req.body.feed
    };
    return data;
};

// CREATE
const api_post_parameter = (req, res, next) => {

    let data = material_data(req);

    let new_material = material_model(data);

    new_material.save().then(()=>{
        console.log(new_material);
        res.send(JSON.stringify(new_material));
    }).catch(err => {
        res.status(500);
        console.log(err);
    });

};
// READ, hakee kaikki parametrit
const api_get_all_parameters = (req, res, next)=>{
    material_model.find({}).then(materials => {
        res.send(JSON.stringify(materials));
    }).catch(err=> {
        res.status(500);
        console.log(err);
    });
};

// READ, hakee yksittäinen parametri
const api_get_parameter = (req, res, next)=>{
    let id = req.params.id;
    
    material_model.findById(id).then(materials => {
        res.send(JSON.stringify(materials));
    }).catch(err=> {
        res.status(500);
        console.log(err);
    });
};

// UPDATE
// PUT /api/material
// findByIdAndUpdate lisäyksenä new: true arvolla palauttaa uudet datat,
// jos ei määritelty default on false
const api_put_parameter = (req, res, next) => {
    let id = req.params.id;
    let data = material_data(req);

    material_model.findByIdAndUpdate(id, data, {
        new: true
    }).then((material)=>{
        res.send(material);
    }).catch(err=> {
        res.status(500);
        console.log(err);
    });;
};

// DELETE
// DELETE /api/material/
const api_delete_parameter = (req, res, next) => {
    let id = req.params.id;
    material_model.findByIdAndDelete(id).then(() => {
        res.send();
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });
};

// EXPORTS
module.exports.api_get_all_parameters = api_get_all_parameters;
module.exports.api_get_parameter = api_get_parameter;
module.exports.api_post_parameter = api_post_parameter;
module.exports.api_delete_parameter = api_delete_parameter;
module.exports.api_put_parameter = api_put_parameter;

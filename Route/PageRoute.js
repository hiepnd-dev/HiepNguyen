const connection = require("../connection");
const item = require("../Model/Item");
const express = require("express");
const PageRoute = express.Router();

PageRoute.post("/:page", async(req,res) =>{
   
    try {
        const items = await item.getItemByPage(req.params.page) ;
        res.status(201).json({
            success: true,
            data: items,
        });
    } catch (error) {
        res.json({
            success: false,
            error,
          });
        
    };

} );
     //console.log(req.params.id);
    // try {
    //     const items = await item.getSortByPage(req.params.page,req.body.sortType) ;
    //     res.status(201).json({
    //         success: true,
    //         data: items,
    //     });
    // } catch (error) {
    //     res.json({
    //         success: false,
    //         error,

    //       });
        
    // };
    PageRoute.post("/:page/sortType", async(req,res) =>{
   
        try {
            const items = await item.getSortByPage(req.params.page,req.body.sortType ) ;
            res.status(201).json({
                success: true,
                data: items,
            });
        } catch (error) {
            res.json({
                success: false,
                error,
              });
            
        };
    
    } );

    PageRoute.post("/:page/search", async(req,res) =>{
   
        try {
            const items = await item.getSearchItem(req.body.sortType) ;
            res.status(201).json({
                success: true,
                data: items,
            });
        } catch (error) {
            res.json({
                success: false,
                error,
              });
            
        };
    
    } )

module.exports = PageRoute;



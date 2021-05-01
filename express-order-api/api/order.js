
const orderRouter = (app, admin) => {
    app.post('/orders',async(req,res)=>{
        if(!req.body)
            res.json({status:400,message:'No Input found'});
        try {
            const db = admin.firestore();

            const orderRef = db.collection("orders");
            const doc = await orderRef.add({
                    title: req.body.title,
                    bookingDate: req.body.bookingDate,
                    address: req.body.address,
                    customer: req.body.customer
                }, error => {
                if (error) {
                    console.log("Data could not be saved." + error);
                } else {
                    console.log("Data saved successfully.");
                }
            });

            return res.status(200).json({status: 200, message: 'Sucessfully added'});
        }catch(err) {
            // catches errors both in fetch and response.json
            console.log(err);
            res.json({status:400,message:'Input Error'});
        }
    })



    app.get('/orders',async(req,res)=>{
        try {
            const db = admin.firestore();
            const orders = await db.collection("orders").get();
            // const doc =  ref.get();
            const orderList = [];
            if (orders.docs.length > 0) {
                orders.forEach((order) => {
                    orderList.push(order.data())
                })
            }
            return res.status(200).json(orderList)

        }catch(err) {
            // catches errors both in fetch and response.json
            console.log(err);
            res.json({status:400,message:' Error'});
        }
    })

    app.get('/orders/:id',async(req,res)=>{
        try {
            const db = admin.firestore();
            const order = await db.collection("orders").doc(req.params.id).get();
            if (order.exists) {
                return res.status(200).json(order.data())
            }else
                return res.json({status:200,message:'No order found'});

        }catch(err) {
            // catches errors both in fetch and response.json
            console.log(err);
            res.json({status:400,message:' Error'});
        }
    })

    app.put('/orders/:id',async(req,res)=>{
        try {
            const db = admin.firestore();
            const order = await db.collection("orders").doc(req.params.id).update(req.body);
            if (order) {
                return res.json({status:200,message:'Updated successfully'});
            }else
                return res.json({status:200,message:'No order found'});

        }catch(err) {
            // catches errors both in fetch and response.json
            console.log(err);
            res.json({status:400,message:' Error'});
        }
    })

};

module.exports = orderRouter;
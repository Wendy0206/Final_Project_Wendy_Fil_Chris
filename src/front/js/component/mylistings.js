import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { AppContext } from "../layout";
import { BrowserRouter, Route, Routes, Link, useNavigate } from "react-router-dom";

export const MyListings = () => {

    const { store, actions } = useContext(Context);
    const { currentUser, myProperties, setMyProperties,
        setCurrentUser, token, setToken, role, setRole,
        myListings, setMyListings, filterListings, setFilterListings

    } = useContext(AppContext);


    const navigate = useNavigate();

    // fetch and set all properties to myProperties on load below
    useEffect(() => {

        fetch(process.env.BACKEND_URL + "api/user/" + currentUser.id + "/property/all")
            .then(res => {
                if (!res.ok) throw Error(res.statusText);
                return res.json();
            })
            .then(response => {

                console.log(response)
                let newArray = [...response];
                let finalProperty = [];

                newArray.forEach((el) => {
                    let each_property = {};
                    let all_img = el.img.split("  ");
                    // console.log(all_img)
                    each_property = el;
                    each_property.image1 = all_img[0];
                    each_property.image2 = all_img[1];
                    each_property.image3 = all_img[2];
                    finalProperty.push(each_property);
                })
                setMyProperties(finalProperty);
            })
            .catch(error => console.log(error));
    }, []);


    //   fetch all listings and store in myListings below 
    useEffect(() => {

        fetch(process.env.BACKEND_URL + `api/user/${currentUser.id}/listing`)
            .then(res => {
                if (!res.ok) throw Error(res.statusText);
                return res.json();
            })
            .then(responseAsJson => {

                console.log(responseAsJson)
                let newArray = [...responseAsJson];
                let finalProperty = [];

                newArray.forEach((el) => {
                    let each_property = {};
                    // let all_img = el.img.split("  ");
                    // console.log(all_img)
                    each_property = el;
                    // each_property.image1 = all_img[0];
                    // each_property.image2 = all_img[1];
                    // each_property.image3 = all_img[2];
                    finalProperty.push(each_property);
                })
                setMyListings(finalProperty);
            })

            .catch(error => console.log(error));

    }, []);

    // Match property_id from myListingslistings with property Ids from myProperties and create new array of objects
    // for listings below

    var listingArray = []

    myProperties.map((element) => {
        myListings.forEach((elm) => {
            if (elm.property_id == element.id) {
                let tempObj = element
                tempObj.special_note = elm.special_note
                tempObj.date_needed = elm.date_needed
                tempObj.status = elm.status
                listingArray.push(tempObj)
                console.log("the matching elements")
                console.log(listingArray)
            }
        })
    })

    const results = listingArray.filter((elm) => elm.status == filterListings);
    console.log("filter results:")
    console.log(results)
    console.log(filterListings)

    return (
        <div>
            <div className="product-list-container">{
                results.map((element) => {
                    return (
                        <div className="card text-secondary" style={{ width: "18rem" }} key={element.id}>
                            <div id="carouselExampleSlidesOnly" className="carousel slide h-50" data-bs-ride="carousel">
                                <div className="carousel-inner" style={{ height: "10rem" }}>
                                    <div className="carousel-item active">
                                        <img src={element.image1} className="d-block w-100 " alt="..." />
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <p className="card-title fs-5">{element.name}</p>
                                <p className="card-text"><u>Date Needed:</u><br />
                                    {element.date_needed}</p>
                                <p className="card-text"><u>Special Instructions:</u><br />
                                    {element.special_note}</p>
                                <p className="card-text">
                                    <p className="card-text" style={element.status == true ? { display: "block" } : { display: "none" }}>
                                        <i className="fa-solid fa-circle text-warning fs-3"></i> Pairing with Cleaner
                                    </p>
                                    <p className="card-text" style={element.status == false ? { display: "block" } : { display: "none" }}>
                                        <i className="fa-solid fa-circle text-success fs-3"></i> Cleaning Scheduled
                                    </p>
                                    <p className="button-24">Cancel Cleaning</p>
                                </p>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}


// tempArray = [...element]
// newArray = []
// myProperties.forEach((el) => {
//     newArray.push(el)
// })
// console.log("new array below")
// console.log(newArray)

// return (<div>{element.image1}</div>)









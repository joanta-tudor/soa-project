import React, {useEffect, useState} from "react";
import CarInput from "./CarInput";
import List from "./List";
import apiClient from "../core";
import CarTextArea from "./CarTextArea";

class Car {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description
    }
}

export const CarList = (props) => {
    const [carList, setCarList] = useState([]);
    const [trendingCars, setTrendingCars] = useState([]);
    const [car, setCar] = useState(new Car("", "", ""));
    const [token, setToken] = useState(props.value);

    useEffect(() => {
        const dataFetch = async () => {
            await getAllCars()
        };
        const trendingFetch = async () => {
            await getTrending()
        };

        dataFetch();
        trendingFetch()
    }, []);

    // API CALLS
    const getAllCars = async () => {
        const response = await apiClient(token).get("");
        console.log(`CARS:`)
        console.log(response.data)
        const allCars = [];
        response.data.forEach((data) => {
            const car = new Car(data.id, data.name, data.description)
            allCars.push(car)
        });
        setCarList(allCars)
    };

    const getTrending = async () => {
        const response = await apiClient(token).get("/trending");
        const allTrending = [];
        response.data.forEach((data) => {
            const car = new Car(data.id, data.name, data.description)
            allTrending.push(car)
        });
        setTrendingCars(allTrending)
    };

    const addCar = async () => {
        if (car === null || car.name === "" || car.description === "") {
            return
        }

        const carToSave = { name: car.name, description: car.description }
        const response = await apiClient(token).post("/save", carToSave);

        console.log(response.data)

        setCarList([...carList, response.data]);
        setCar(new Car("", "", ""))
    };

    const deleteCar = async (carToDelete) => {

        const response = await apiClient(token).delete(`/delete/${carToDelete.id}`);
        console.log(response)

        const newCarList = carList.filter((car) => {
            return car.id !== carToDelete.id;
        });
        setCarList(newCarList);
    };

    // SET NAME & DESCRIPTION
    const setName = (name) => {
        const newCar = new Car();
        newCar.name = name
        if (car === null) {
            newCar.description = ""
        } else {
            newCar.description = car.description
        }
        setCar(newCar)
    }

    const setDescription = (description) => {
        const car1 = new Car();
        car1.description = description
        if (car === null) {
            car1.name = ""
        } else {
            car1.name = car.name
        }
        setCar(car1)
    }

    return (
        <div>
            <label className={"page-subtitle"}>new car</label>
            <div className={"car-add"}>
                <div id="outer-div">
                <CarInput id={"inner-div"}
                          carInfo={car.name}
                          setText={setName}
                          placeholder={"name"}/>

                <CarTextArea id={"inner-div"}
                             carInfo={car.description}
                             setText={setDescription}
                             placeholder={"description"}/>

                    <button className="add-button" id={"inner-div"} onClick={addCar}>
                        ADD CAR
                    </button>
                </div>
            </div>

            <label className={"page-subtitle"}> all cars</label>
            <List list={carList} remove={deleteCar} canRemove={true}/>

            <div className={"trending"}>
                <label className={"page-subtitle"}> trending</label>
                <List list={trendingCars} remove="" canRemove={false}/>
            </div>
        </div>
    );
}

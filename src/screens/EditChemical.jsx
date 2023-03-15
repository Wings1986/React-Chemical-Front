import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../styles/AddChemical.scss";
import {api_url} from '../utils/constants'
import InputGroup from "../components/InputGroup";
import SubmitButton from "../components/SubmitButton";

const EditChemical = ({setShowEditModal, chemicalData, setChemicalData, fetchChemicals}) => {

    const {token, id} = JSON.parse(localStorage.getItem("user_info"))
    const [isLoading, setIsLoading] = useState(false);

    const {chemicalName, chemicalQuantity} = chemicalData;

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        fetch(api_url + "/chemicals/" + chemicalData._id, {
            method: "POST",
            headers: {
                "Content-type": "Application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                chemicalName,
                chemicalQuantity,
            })
        })
            .then(res => res.json())
            .then(async data => {
                await fetchChemicals();
                setIsLoading(false);
                setShowEditModal(false);
            })
            .catch(err => {
                setIsLoading(false);
                alert('Failed to Updated!');
                console.log(err)
            })
    }






    const handleChange = (e) => {
        setChemicalData({ ...chemicalData, [e.target.name]: e.target.value })
    }


    return (
        <div>
            <Form onSubmit={handleSubmit} className="max-w-md mx-auto p-10 rounded-md">
                <h2 className={`text-xl mb-10`}>Edit Chemical</h2>
                <InputGroup>
                    <Form.Label>Chemical Name: </Form.Label>
                    <Form.Control onChange={handleChange} name='chemicalName' value={chemicalName} type="text" placeholder="Enter chemical name.." />
                </InputGroup>
                <InputGroup>
                    <Form.Label>Chemical Quantity</Form.Label>
                    <Form.Control onChange={handleChange}  name='chemicalQuantity' value={chemicalQuantity} type="number" placeholder="Enter chemical quantity" />
                </InputGroup>
                <SubmitButton isLoading={isLoading} text={'Save'} />
            </Form>
        </div>
    );
};

export default EditChemical;

import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


interface FormData {
  type: string;
  quantity: number;
  condition: string;
}

interface Response{
  message:string;
  success:boolean;
  data:any
}


const UserDashboard = () => {
  
  const navigate = useNavigate();
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>();
  
    const submitHandler = async(data: FormData) => {
      console.log("data-->", data);
  
      try {
        const wasteAddResponse:Response=await axios.post("http://localhost:3000/api/v1/add-waste",data)
        console.log("add Response Repsonse-->",wasteAddResponse)
        if(!wasteAddResponse.success==false){
          console.log("failed to add waste")
        }
        toast.success("Waste Detail Added Successfully")
      } catch (error) {
        console.log("error occuresd adding waste detials",error)
      }
    };
  



  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Waste Management Dashboard
      </h1>


      <form
        onSubmit={handleSubmit(submitHandler)}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Type of Waste
          </label>
          <select
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
            {...register("type", { required: "type is required" })}
          >
            <option value="">Select waste type</option>
            <option value="Plastic">Plastic</option>
            <option value="Paper">Paper</option>
            <option value="Glass">Glass</option>
            <option value="Metal">Metal</option>
            <option value="Organic">Organic</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Quantity (kg)
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
            {...register("quantity", { required: "quantity is required" })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Condition
          </label>
          <input
            type="text"
            placeholder="Optional - E.g., Good, Damaged, etc."
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            {...register("condition", { required: "condition is required" })}
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          List Waste for Sale
        </button>
      </form>
    </div>
  )
}

export default UserDashboard

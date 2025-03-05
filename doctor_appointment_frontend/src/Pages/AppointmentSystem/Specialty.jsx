import { useState, useEffect } from "react";
import ShareButton from "../../components/ShareButton/ShareButton";
import { useAxios } from "../../Hooks/AxiosProvider";
import Swal from "sweetalert2";

function Specialty({ nextStep, specialty, updateFormData, doctor }) {
    const axiosInstantApi = useAxios();
    const [specialties, setSpecialties] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [services, setServices] = useState([]);
    // console.log(doctor.name);

    // Set specialties when props change
    useEffect(() => {
        if (Array.isArray(specialty)) {
            setSpecialties(specialty);
        } else if (specialty) {
            setSpecialties([specialty]);
        }
    }, [specialty]);

    // Fetch the services from the API
    useEffect(() => {
        const fetchService = async () => {
            try {
                const res = await axiosInstantApi.get("services");
                // console.log(res?.data)
                const serviceList = res?.data?.flatMap((ser) => ser || []);
                setServices(serviceList);
            } catch (error) {
                console.error("Error fetching services:", error);
                setServices([]);
            }
        };
        fetchService();
    }, [axiosInstantApi]);

    // Filter services based on selected specialty
    const filteredServices = services.find((service) => service?.name === selectedSpecialty);

    // Update form data with the selected service
    // useEffect(() => {
    //     if (selectedService) {
    //         const { id, name, price } = selectedService;
    //         updateFormData("selectedService", {
    //             specialty: selectedSpecialty,
    //             service_id: id,
    //             service_name: name,
    //             service_price: price,
    //         });
    //     }
    // }, [selectedService, selectedSpecialty]);

    const handleNext = () => {
        if (!selectedService) {
            Swal.fire({
                icon: "error",
                title: "Please select a service first.",
                showConfirmButton: false,
                timer: 1500, // automatically close after 1.5 seconds
            });
        } else {
            const { id, name, price } = selectedService;
            updateFormData("selectedService", {
                doctor: doctor,
                specialty: selectedSpecialty,
                service_id: id,
                service_name: name,
                service_price: price,
            });
            nextStep();
        }
    };


    return (
        <div>
            <h2 className="text-2xl font-bold">Select Specialty</h2>
            <select
                className="border p-2 w-full mt-4 bg-transparent"
                value={selectedSpecialty || ''}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
                <option className="bg-[--primary-color]" value="">Choose Specialty</option>
                {/* Render options from specialties */}
                {specialties.map((item, index) => (
                    <option className="bg-[--primary-color]" key={index} value={item}>
                        {item}
                    </option>
                ))}
            </select>

            {/* Show services only if a specialty is selected */}
            {selectedSpecialty && (
                <div className="mt-4">
                    <h3 className="font-semibold">Available Services for {selectedSpecialty}:</h3>
                    {filteredServices && filteredServices?.services?.length > 0 ? (
                        filteredServices?.services?.map((service) => (
                            <div
                                style={{
                                    boxShadow: `rgba(149, 157, 165, 0.2) 0px 2px 12px`,
                                }}
                                key={service?.id} className="px-3 py-1 mt-2"
                            >
                                <label>
                                    <input
                                        type="radio"
                                        name="service"
                                        value={service?.id}
                                        onChange={() => setSelectedService(service)}
                                    />
                                    <span className="ml-2">
                                        {service?.name} - Price: ${service?.price}
                                    </span>
                                </label>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">No services available for this specialty.</p>
                    )}
                </div>
            )}

            <button
                className="w-[20%] mt-2"
                onClick={handleNext}
            // disabled={!selectedService}
            >
                <ShareButton width="300px">Go Appointment Type</ShareButton>
            </button>
        </div>
    );
}

export default Specialty;

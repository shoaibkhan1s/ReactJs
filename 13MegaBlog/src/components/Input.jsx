import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label, // Label text jo input field ke upar dikhaya jayega
    type = 'text', // Input ka type, default se 'text' set kiya gaya hai
    classname = '', // Custom CSS classes jo input field me add karna chahte ho
    ...props // Baaki ke props jo parent se pass honge
}, ref) {
    const id = useId() // Unique ID generate karne ke liye useId hook ka use
    return (
        <div className='w-full'> {/* Input field aur label ko wrap karne ke liye container */}
            {
                label && <label 
                className='inline-block mb-1 pl-1' // Label ke liye styling
                htmlFor={id}> {/* Label ko input field se associate karne ke liye */}
                    {label} {/* Label ka text */}
                </label>
            }

            <input 
            type={type} // Input field ka type set kar rahe hain, jaise text, password, etc.
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${classname}`} 
            ref={ref} // Ref ko input field ke saath attach kar rahe hain
            {...props} // Baaki ke props jo input field ko pass karne hain
            id={id} // Unique ID jo input field ke saath associate hai
            />

        </div>
    )
})

export default Input

import { useForm } from "react-hook-form";
import ToDo from "../src/ToDo";

// interface IForm {
//   email: string;
//   id: string;
//   password: string;
//   password2: string;
//   age: string;
//   extraError?: string;
// }
// const Home = () => {
//   const {
//     register,
//     watch,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm<IForm>({
//     defaultValues: {
//       email: "@naver.com",
//     },
//   });
//   //   console.log(watch());
//   const isValid = (data: IForm) => {
//     if (data.password !== data.password2) {
//       setError(
//         "password2",
//         { message: "Password are not same" },
//         { shouldFocus: true }
//       );
//     }
//     // setError("extraError", { message: "Server Offline" });
//   };

//   console.log(errors);
//   return (
//     <div>
//       <form
//         style={{ display: "flex", flexDirection: "column" }}
//         onSubmit={handleSubmit(isValid)}
//       >
//         <input
//           {...register("email", {
//             required: "Email is required",
//             pattern: {
//               value: /^[A-Za-z0-9._%+-]+@naver.com$/, //Regular Expression
//               message: "Only naver.com emails allowed",
//             },
//           })}
//           placeholder="email"
//         />
//         <span>{errors?.email?.message as string}</span>
//         <input
//           {...register("id", {
//             required: true,
//             validate: {
//               noPjy: (value) => !value.includes("pjy") || "pjy is not allowed",
//             },
//           })}
//           placeholder="id"
//         />
//         <span>{errors?.id?.message as string}</span>
//         <input
//           {...register("password", {
//             required: true,
//             minLength: { value: 5, message: "Your password is too short" },
//           })}
//           placeholder="password"
//         />
//         <span>{errors?.password?.message as string}</span>
//         <input
//           {...register("password2", { required: true })}
//           placeholder="password2"
//         />
//         <span>{errors?.password2?.message as string}</span>
//         <input {...register("age", { required: true })} placeholder="age" />
//         <span>{errors?.age?.message as string}</span>
//         <button>Submit</button>
//         <span>{errors?.extraError?.message as string}</span>
//       </form>
//     </div>
//   );
// };
const Home = () => {
  return <ToDo />;
};
export default Home;

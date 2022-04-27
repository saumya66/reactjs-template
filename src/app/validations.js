import * as Yup from "yup";
// import passwordValidator from "password-validator";

// const passwordSchema = new passwordValidator();

// passwordSchema
//   .is().min(8,"should contain minimum 8 characters") 
//   .is().max(128)
//   .has().uppercase(1,"atleast 1 uppercase characted") 
//   .has().lowercase(1,"atleast 1 lowercase characted") 
//   .has().digits(1,"atleast 1 digit characted")
//   .has().not().spaces();

const signUpSchema = Yup.object({
      email : Yup.string().email("invalid email").required('please enter your email'),
      password : Yup.string()
      .required('please enter your password')
        .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 special Character"
        ),
})
    
export {
    // passwordSchema, 
    signUpSchema};


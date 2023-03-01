import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const auth = getAuth();

const uiConfig = {
  // FirebaseUI config
};

function SignInScreen() {
  return (
    <div>
      <h1>Sign In</h1>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </div>
  );
<<<<<<< HEAD
}
=======
}
<<<<<<< HEAD
>>>>>>> 3eb1c0f (Consolidate assets)
=======
>>>>>>> 9af0ff6 (added some files from main)
>>>>>>> 698a5b3 (added some files from main)

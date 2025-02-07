/* src/app/index.tsx */

/**
 * App folder must have an index.tsx file.
 * This just re-directs to the entry page of the app - sign-in
 */

/* Core */
import { Redirect } from "expo-router";

const index = () => {
  return <Redirect href={"/sign-in"} />;
};

export default index;

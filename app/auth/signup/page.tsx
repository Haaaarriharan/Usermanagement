/********************************Import Components*************************************/
"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
/********************************Import Formik*************************************/
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "react-query";
import UserService from "@/app/axios/service/user.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  //VALIDATION SCHEMA
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const formik: any = useFormik({
    enableReinitialize: true,

    //INITIAL VALUES
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      signUpUser(values);
    },
  });

  //REGISTER USER
  const { mutate: signUpUser, isLoading: loading } = useMutation<any>(
    async (data: any) => {
      return await UserService.signUp(data);
    },
    {
      onSuccess: (res: any) => {
        router.push("/");
        toast.success(`${res.message}`);
      },
      onError: (err: any) => {
        console.log(err.response?.data || err);
        toast.error(`${err.message}`);
      },
    }
  );

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-950">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
          <CardDescription>Enter your details to access.</CardDescription>
        </CardHeader>
        <form onSubmit={formik.handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p>Name</p>
              <Input
                id="name"
                name="name"
                placeholder="Username"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className=" text-red-600 text-sm">
                  {formik.errors.name}
                </div>
              ) : null}
            </div>
            <div className="space-y-2">
              <p>Email</p>
              <Input
                id="email"
                name="email"
                placeholder="m@example.com"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className=" text-red-600 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="space-y-2">
              <p>Password</p>
              <Input
                id="password"
                name="password"
                type="text"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className=" text-red-600 text-sm">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              {loading ? "loading" : "Create User"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

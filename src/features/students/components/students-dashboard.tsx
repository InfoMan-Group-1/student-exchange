"use client";

import { useState } from "react";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Student } from "@/features/students/model";

const fetcher = async (url: string): Promise<Student[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch students.");
  }

  return response.json() as Promise<Student[]>;
};

export function StudentsDashboard() {
  const [error, setError] = useState("");
  const { data, isLoading, mutate } = useSWR<Student[]>(
    "/api/students",
    fetcher,
    {
      onError(fetchError) {
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Unexpected error while loading students.",
        );
      },
    },
  );

  async function handleSubmit(formData: FormData) {
    const payload = {
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      destinationCountry: String(formData.get("destinationCountry") ?? ""),
    };

    try {
      setError("");
      const response = await fetch("/api/students", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json()) as { message?: string };
        throw new Error(data.message ?? "Create student failed.");
      }

      await mutate();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unexpected error while creating student.",
      );
    }
  }
  const students = data ?? [];

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Student Exchange Backend Starter</CardTitle>
          <CardDescription>
            Next.js + mysql2 + dbmate migrations + native SQL queries.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={handleSubmit}
            className="grid grid-cols-1 gap-4 md:grid-cols-3"
          >
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" name="fullName" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destinationCountry">Destination Country</Label>
              <Input
                id="destinationCountry"
                name="destinationCountry"
                required
              />
            </div>
            <div className="md:col-span-3">
              <Button type="submit">Create Student</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Students</CardTitle>
          <CardDescription>
            {isLoading ? "Loading..." : `${students.length} students found`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Destination</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.fullName}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.destinationCountry}</TableCell>
                </TableRow>
              ))}
              {!isLoading && students.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-sm">
                    No students yet.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}

"use client";

import { useState } from "react";
import useSWR from "swr";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  const { data, isLoading } = useSWR<Student[]>("/api/students", fetcher, {
    onError(fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Unexpected error while loading students.",
      );
    },
  });

  const students = data ?? [];

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Student Exchange</CardTitle>
          <CardDescription>
            Students loaded from TiDB via native SQL (mysql2).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student #</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>GWA</TableHead>
                <TableHead>School email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.studentNumber}>
                  <TableCell>{student.studentNumber}</TableCell>
                  <TableCell>{student.fullName}</TableCell>
                  <TableCell>{student.programId}</TableCell>
                  <TableCell>{student.cumulativeGwa ?? "—"}</TableCell>
                  <TableCell>{student.schoolEmail ?? "—"}</TableCell>
                </TableRow>
              ))}
              {!isLoading && students.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-sm">
                    No students found. Run migrations and seed first.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
          <p className="text-sm text-muted-foreground">
            {isLoading ? "Loading..." : `${students.length} students`}
          </p>
        </CardContent>
      </Card>
    </main>
  );
}

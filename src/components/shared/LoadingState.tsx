"use client";

import { Skeleton } from "@/src/components/ui/skeleton";

export const ProjectCardSkeleton = () => (
  <div className="border border-border rounded-lg p-6 space-y-4">
    <div className="flex items-center justify-between">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-5 w-16" />
    </div>
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-16 w-full" />
    <div className="flex gap-2">
      <Skeleton className="h-6 w-16" />
      <Skeleton className="h-6 w-16" />
      <Skeleton className="h-6 w-16" />
    </div>
    <div className="flex justify-between items-center">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-9 w-24" />
    </div>
  </div>
);

export const ProjectGridSkeleton = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <ProjectCardSkeleton key={i} />
    ))}
  </div>
);

export const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

export const PageLoadingState = () => (
  <div className="min-h-screen bg-background p-8">
    <div className="container mx-auto space-y-6">
      <Skeleton className="h-12 w-64" />
      <div className="grid md:grid-cols-3 gap-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
      <ProjectGridSkeleton />
    </div>
  </div>
);



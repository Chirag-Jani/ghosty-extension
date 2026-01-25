import { toast } from "sonner";

/**
 * Downloads the Veil extension zip file
 * Provides user feedback and handles errors gracefully
 * This function is called after user confirmation
 */
export const downloadExtension = async (): Promise<void> => {
  try {
    // Show loading toast
    const loadingToast = toast.loading("Preparing Veil Extension download...", {
      description: "This may take a moment",
    });

    // The zip file should be in the public folder
    const zipUrl = "/veil-extension.zip";
    const filename = "veil-extension.zip";

    // Fetch the file
    const response = await fetch(zipUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to download: ${response.statusText}`);
    }

    // Get the blob
    const blob = await response.blob();

    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    window.URL.revokeObjectURL(url);

    // Dismiss loading toast and show success
    toast.dismiss(loadingToast);
    toast.success("Download started!", {
      description: "Check your downloads folder for veil-extension.zip",
      duration: 5000,
    });
  } catch (error) {
    console.error("Error downloading extension:", error);
    toast.error("Download failed", {
      description: error instanceof Error ? error.message : "Please try again later",
      duration: 5000,
    });
  }
};

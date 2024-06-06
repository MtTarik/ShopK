"use client"

import axios from "axios";
import {useState, useEffect} from "react";

import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import dynamic from "next/dynamic";

const EmailConfirmation = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const checkTokenValidity = async (inputToken: string) => {
      try {
        const response = await axios.patch(`http://localhost:8080/api/registration?token=${inputToken}`);

        if (response.status === 200) {
          setIsConfirmed(true);
        }
      } catch (error) {
        setIsConfirmed(false);
      } finally {
        setIsLoading(true);
      }
    };

    const token = new URLSearchParams(window.location.search).get("token");

    if (!token) {
      setIsLoading(false);
      return;
    }

    checkTokenValidity(token);
  }, [mounted]);

  if (!mounted || isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {isConfirmed ? (
        <Typography variant="h4">Registration confirmed successfully!</Typography>
      ) : (
        <Typography variant="h4">Registration confirmation failed.</Typography>
      )}
    </div>
  );
};

// Dynamic import with client-side rendering only
export default dynamic(() => Promise.resolve(EmailConfirmation), {
  ssr: false,
});

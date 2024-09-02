"use client"
import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from './ui/button'
import { X } from 'lucide-react'
import { Message } from '@/model/Message.model'
import { useToast } from './ui/use-toast'
import axios from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
type MessageCardProps = {
  key:string;
  message: Message;
  onMessageDelete: (messageId: string) => void;
};
const MessageCards = ({message,onMessageDelete}:MessageCardProps) => {
  const {toast}=useToast()
  const handleDeleteconfirm=async()=>{
    const response=await axios.delete<ApiResponse>(`/api/deletemessage/${message._id}`)
    toast({
      title:response.data.message
    })
    onMessageDelete((message._id ).toString())
    console.log('Delete Confirmed')
  }
  return (
    <Card>
    <CardHeader>
      <CardTitle>{message.content}</CardTitle>
      <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline"><X className='w-5 h-5'/></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteconfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </CardHeader>
  </Card>  
  )
}

export default MessageCards
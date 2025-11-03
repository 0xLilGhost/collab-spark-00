import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface MessageDialogProps {
  recipientId: string;
  recipientName: string;
  buttonText?: string;
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  className?: string;
}

const MessageDialog = ({ 
  recipientId, 
  recipientName, 
  buttonText = "Connect",
  buttonVariant = "outline",
  className 
}: MessageDialogProps) => {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSendMessage = async () => {
    if (!user) {
      toast({
        title: t("message.loginRequired"),
        description: t("message.loginRequiredDesc"),
        variant: "destructive",
      });
      return;
    }

    if (!message.trim()) {
      toast({
        title: t("message.emptyMessage"),
        description: t("message.emptyMessageDesc"),
        variant: "destructive",
      });
      return;
    }

    setSending(true);

    const { error } = await supabase.from("messages").insert({
      sender_id: user.id,
      recipient_id: recipientId,
      subject: subject || t("message.noSubject"),
      message: message.trim(),
    });

    setSending(false);

    if (error) {
      toast({
        title: t("message.sendError"),
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: t("message.sent"),
      description: t("message.sentDesc"),
    });

    setSubject("");
    setMessage("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} className={className}>
          <MessageCircle className="h-4 w-4" />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("message.sendTo")} {recipientName}</DialogTitle>
          <DialogDescription>
            {t("message.dialogDesc")}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="subject">{t("message.subject")}</Label>
            <Input
              id="subject"
              placeholder={t("message.subjectPlaceholder")}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">{t("message.message")}</Label>
            <Textarea
              id="message"
              placeholder={t("message.messagePlaceholder")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="resize-none"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              {t("message.cancel")}
            </Button>
            <Button onClick={handleSendMessage} disabled={sending}>
              {sending ? t("message.sending") : t("message.send")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageDialog;
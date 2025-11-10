import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const teamSchema = z.object({
  name: z.string().trim().min(1, "Team name is required").max(100),
  description: z.string().trim().max(500).optional(),
  stage: z.string().optional(),
  industry: z.string().optional(),
  location: z.string().trim().max(100).optional(),
  looking_for: z.string().trim().max(300).optional(),
  team_size: z.number().min(1).max(1000).optional(),
  website_url: z.string().trim().url("Invalid URL").or(z.literal("")).optional(),
});

interface CreateTeamDialogProps {
  type: "startup" | "competition";
  onSuccess?: () => void;
}

const CreateTeamDialog = ({ type, onSuccess }: CreateTeamDialogProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roleInput, setRoleInput] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    stage: "",
    industry: "",
    location: "",
    looking_for: "",
    team_size: 1,
    website_url: "",
    open_roles: [] as string[],
    equity_offered: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const addRole = () => {
    if (roleInput.trim() && !formData.open_roles.includes(roleInput.trim())) {
      setFormData({
        ...formData,
        open_roles: [...formData.open_roles, roleInput.trim()],
      });
      setRoleInput("");
    }
  };

  const removeRole = (role: string) => {
    setFormData({
      ...formData,
      open_roles: formData.open_roles.filter((r) => r !== role),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: t("error"),
        description: t("createTeam.loginRequired"),
        variant: "destructive",
      });
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      // Validate form data
      const validatedData = teamSchema.parse(formData);

      // Insert team
      const { error } = await supabase.from("teams").insert({
        name: validatedData.name,
        description: validatedData.description,
        stage: validatedData.stage,
        industry: validatedData.industry,
        location: validatedData.location,
        looking_for: validatedData.looking_for,
        team_size: validatedData.team_size,
        website_url: validatedData.website_url,
        type,
        founder_id: user.id,
        open_roles: formData.open_roles,
        equity_offered: formData.equity_offered,
      } as any);

      if (error) throw error;

      toast({
        title: t("success"),
        description: t("createTeam.success"),
      });

      // Reset form
      setFormData({
        name: "",
        description: "",
        stage: "",
        industry: "",
        location: "",
        looking_for: "",
        team_size: 1,
        website_url: "",
        open_roles: [],
        equity_offered: false,
      });
      
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast({
          title: t("error"),
          description: t("createTeam.error"),
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          {t("createTeam.button")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {type === "startup" ? t("createTeam.titleStartup") : t("createTeam.titleCompetition")}
          </DialogTitle>
          <DialogDescription>
            {type === "startup" ? t("createTeam.descStartup") : t("createTeam.descCompetition")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t("createTeam.name")} *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={t("createTeam.namePlaceholder")}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t("createTeam.description")}</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={t("createTeam.descriptionPlaceholder")}
              rows={3}
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stage">{t("createTeam.stage")}</Label>
              <Select value={formData.stage} onValueChange={(value) => setFormData({ ...formData, stage: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={t("createTeam.selectStage")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="idea">{t("createTeam.stageIdea")}</SelectItem>
                  <SelectItem value="mvp">{t("createTeam.stageMVP")}</SelectItem>
                  <SelectItem value="growth">{t("createTeam.stageGrowth")}</SelectItem>
                  <SelectItem value="scale">{t("createTeam.stageScale")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">{t("createTeam.industry")}</Label>
              <Input
                id="industry"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                placeholder="e.g., AI/ML, FinTech"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">{t("createTeam.location")}</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder={t("createTeam.locationPlaceholder")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="team_size">{t("createTeam.teamSize")}</Label>
              <Input
                id="team_size"
                type="number"
                min="1"
                value={formData.team_size}
                onChange={(e) => setFormData({ ...formData, team_size: parseInt(e.target.value) || 1 })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="open_roles">{t("createTeam.openRoles")}</Label>
            <div className="flex gap-2">
              <Input
                id="open_roles"
                value={roleInput}
                onChange={(e) => setRoleInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addRole())}
                placeholder={t("createTeam.addRole")}
              />
              <Button type="button" onClick={addRole} variant="outline">
                {t("profile.add")}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.open_roles.map((role) => (
                <Badge key={role} variant="secondary" className="gap-1">
                  {role}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeRole(role)} />
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="looking_for">{t("createTeam.lookingFor")}</Label>
            <Textarea
              id="looking_for"
              value={formData.looking_for}
              onChange={(e) => setFormData({ ...formData, looking_for: e.target.value })}
              placeholder={t("createTeam.lookingForPlaceholder")}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website_url">{t("createTeam.website")}</Label>
            <Input
              id="website_url"
              type="url"
              value={formData.website_url}
              onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
              placeholder="https://example.com"
            />
            {errors.website_url && <p className="text-sm text-destructive">{errors.website_url}</p>}
          </div>

          {type === "startup" && (
            <div className="flex items-center space-x-2">
              <Switch
                id="equity_offered"
                checked={formData.equity_offered}
                onCheckedChange={(checked) => setFormData({ ...formData, equity_offered: checked })}
              />
              <Label htmlFor="equity_offered">{t("createTeam.equityOffered")}</Label>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {t("cancel")}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? t("createTeam.creating") : t("createTeam.create")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTeamDialog;

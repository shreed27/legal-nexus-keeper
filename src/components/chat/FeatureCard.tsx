
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Feature } from "@/types/chat";

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard = ({ feature }: FeatureCardProps) => {
  const Icon = feature.icon;
  
  return (
    <Card className="glass-card hover-scale group">
      <CardHeader className="space-y-4">
        <div className="glow">
          <Icon className="h-10 w-10 text-primary relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
        </div>
        <CardTitle className="gradient-text text-xl">
          {feature.title}
        </CardTitle>
        <CardDescription className="text-white/70 text-base">
          {feature.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default FeatureCard;

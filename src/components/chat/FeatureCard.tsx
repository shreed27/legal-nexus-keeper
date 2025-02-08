
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Feature } from "@/types/chat";

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard = ({ feature }: FeatureCardProps) => {
  const Icon = feature.icon;
  
  return (
    <Card className="glass-card hover-scale">
      <CardHeader>
        <Icon className="h-8 w-8 text-primary mb-2" />
        <CardTitle>{feature.title}</CardTitle>
        <CardDescription>{feature.description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default FeatureCard;

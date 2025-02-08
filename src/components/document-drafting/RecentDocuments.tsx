
import { Award, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const RecentDocuments = () => {
  const recentDocs = [
    { title: "Service Agreement - Draft", date: "2 hours ago" },
    { title: "Employment Contract", date: "Yesterday" },
  ];

  return (
    <div className="mt-8 pt-8 border-t">
      <div className="flex items-center gap-2 mb-4">
        <Award className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium">Recent Documents</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recentDocs.map((doc, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base">{doc.title}</CardTitle>
                  <CardDescription>{doc.date}</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <FileText className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecentDocuments;

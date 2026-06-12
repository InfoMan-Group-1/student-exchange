import { PenTool } from "lucide-react";
import { ApplicationSignature } from "@/lib/mockApplicationData";

interface Props {
  signatures: ApplicationSignature[];
}

export function ReviewSignatories({ signatures }: Props) {
  return (
    <section className="bg-surface rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.05)] border border-outline-variant/30 p-card-padding">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
          <PenTool className="h-6 w-6" />
        </div>
        <h3 className="font-title-lg text-title-lg text-primary">5. Review & Endorsements</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {signatures.map((sig, index) => {
          // Add a mock signature image for the first one as per wireframe
          const hasMockImage = index === 0;
          
          return (
            <div key={sig.role} className="text-center space-y-4">
              <div className="aspect-video w-full border-2 border-dashed border-outline rounded-lg flex items-center justify-center bg-surface-container-lowest overflow-hidden relative">
                {hasMockImage && (
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzHqKu25V_IiRGr7wPo4BamyjqOEUKCtiXXRu72uwDGATD2AB1bE3IWjXiUQcGzBgm3wzQ6ccSXX2we_o6cbHL8Tq7dWhxsbnpI7JKzOpYkUHlKucE8EY0hyJ7qr3ARjEfWMQlxARZGCeRPj8tPi8oaFNaZRVnnLGRc9xjscx6q6jA7-tCE9SMReYTt0M63ilckE2X_nvCc1iC-RKEXeGXn7u13zeXdTymfbuFqzbO3rdr1Sgf5_Hy8ufG63XrvlgYu4dbZ6VihhpT"
                    alt="Signature Placeholder"
                    className="opacity-20 grayscale absolute inset-0 object-cover w-full h-full"
                  />
                )}
                <div className="relative z-10 flex flex-col items-center justify-center p-4">
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Awaiting Digital Signature</p>
                  <p className="text-[10px] text-on-surface-variant/60">Upload Scanned Signatory</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="font-label-md text-label-md font-bold">{sig.name}</p>
                <p className="text-[12px] text-on-surface-variant">{sig.role}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

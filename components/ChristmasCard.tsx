"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardPreview } from "./CardPreview";

interface Props {
    customization: any;
    setCustomization:any;
    userName: any;
    isEditable?: boolean;
  }
export default function ChristmasCard({ 
    customization, 
    setCustomization, 
    userName,
    isEditable = true 
}: Props) {
       // In a real app, you would fetch the card customization from a database
     
      if (!isEditable) {
        return <CardPreview customizations={customization} userName={userName} />;
      }
    

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <CardPreview customizations={customization} userName={userName} />

      {/* Customization Controls */}
      <div className="p-6 rounded-xl shadow-lg space-y-6 bg-slate-900 text-white">
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Input
            id="message"
            value={customization?.message}
            onChange={(e) =>
              setCustomization({ ...customization, message: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Paragraph</Label>
          <Input
            id="message"
            value={customization?.paragraph}
            onChange={(e) =>
              setCustomization({ ...customization, paragraph: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="backgroundColor">Background Color</Label>
          <Input
            id="backgroundColor"
            type="color"
            value={customization?.backgroundColor}
            onChange={(e) =>
              setCustomization({ ...customization, backgroundColor: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="textColor">Text Color</Label>
          <Input
            id="textColor"
            type="color"
            value={customization?.textColor}
            onChange={(e) =>
              setCustomization({ ...customization, textColor: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Font Style</Label>
          <div className="grid grid-cols-2 gap-2">
            {["font-serif", "font-sans", "font-mono"].map((font) => (
              <button
                key={font}
                onClick={() => setCustomization({ ...customization, font })}
                className={`p-2 rounded ${
                  customization?.font === font
                    ? "bg-primary text-white"
                    : "bg-orange-800"
                }`}
              >
                <span className={font}>Sample Text</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
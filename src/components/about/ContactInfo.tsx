import { Mail, Phone, MapPin, Clock } from "lucide-react";

const contactItems = [
  {
    icon: Mail,
    label: "邮箱",
    value: "contact@aiever-robotics.com",
    href: "mailto:contact@aiever-robotics.com",
  },
  {
    icon: Phone,
    label: "电话",
    value: "+86 10 8888 8888",
    href: "tel:+861088888888",
  },
  {
    icon: MapPin,
    label: "地址",
    value: "北京市海淀区中关村软件园 AIeveR 大厦",
  },
  {
    icon: Clock,
    label: "工作时间",
    value: "周一至周五 9:00 - 18:00",
  },
];

export default function ContactInfo() {
  return (
    <div className="bg-bg-secondary border border-border-subtle rounded-xl p-8 md:p-10 h-full">
      <h3 className="text-2xl font-bold text-text-primary mb-2">联系方式</h3>
      <p className="text-text-secondary text-sm mb-8">
        我们随时期待与您的合作和交流
      </p>

      <div className="space-y-6">
        {contactItems.map((item) => {
          const Icon = item.icon;
          const content = (
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-purple-primary/10 border border-purple-primary/30 flex items-center justify-center shrink-0">
                <Icon size={18} className="text-purple-light" />
              </div>
              <div className="flex-1">
                <div className="text-text-secondary text-xs uppercase tracking-wider">
                  {item.label}
                </div>
                <div className="text-text-primary mt-1">{item.value}</div>
              </div>
            </div>
          );

          return item.href ? (
            <a
              key={item.label}
              href={item.href}
              className="block hover:opacity-80 transition-opacity"
            >
              {content}
            </a>
          ) : (
            <div key={item.label}>{content}</div>
          );
        })}
      </div>
    </div>
  );
}

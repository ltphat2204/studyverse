import ChatWidget from "@/components/ChatWidget";
import Focus from "@/components/Focus";

export default async function FocusPage ({
    params,
}: {
    params: Promise<{ event: string }>
}) {
  const { event } = await params;

  return (
    <>
        <Focus event={decodeURIComponent(event)} />
        <ChatWidget />
    </>
  );
};
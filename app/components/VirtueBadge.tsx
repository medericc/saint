import { ReactNode } from 'react'

interface VirtueBadgeProps {
  virtue: string
  children?: ReactNode
}

const virtueColors: { [key: string]: string } = {
  charite: 'bg-red-100 text-red-800 border-red-200',
  paix: 'bg-blue-100 text-blue-800 border-blue-200',
  zele: 'bg-orange-100 text-orange-800 border-orange-200',
  sagesse: 'bg-purple-100 text-purple-800 border-purple-200',
  humilite: 'bg-green-100 text-green-800 border-green-200',
  courage: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  default: 'bg-gray-100 text-gray-800 border-gray-200'
}

const virtueIcons: { [key: string]: string } = {
  charite: '💖',
  paix: '✨',
  zele: '🔥',
  sagesse: '📜',
  humilite: '🌿',
  courage: '⚔️',
  default: '🌟'
}

export default function VirtueBadge({ virtue, children }: VirtueBadgeProps) {
  const colorClass = virtueColors[virtue] || virtueColors.default
  const icon = virtueIcons[virtue] || virtueIcons.default

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${colorClass}`}>
      <span className="mr-1">{icon}</span>
      {children || virtue}
    </span>
  )
}
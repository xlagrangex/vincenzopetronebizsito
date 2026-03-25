import { useEffect, useRef, useState, useCallback, memo } from 'react'
import gsap from 'gsap'

interface ListItem {
  id: string
  label: string
  priority: 'alta' | 'media' | 'bassa'
  metric: string
}

const ITEMS: ListItem[] = [
  { id: 'seo', label: 'Audit SEO Tecnico', priority: 'alta', metric: '+47.2%' },
  { id: 'conv', label: 'Ottimizzazione Conversioni', priority: 'media', metric: '+31.8%' },
  { id: 'perf', label: 'Performance Core Vitals', priority: 'alta', metric: '94/100' },
  { id: 'ux', label: 'Redesign UX Mobile', priority: 'bassa', metric: '+22.6%' },
  { id: 'brand', label: 'Brand Identity System', priority: 'media', metric: '+38.1%' },
]

const ITEM_HEIGHT = 48
const GAP = 6
const CYCLE_INTERVAL = 2400

const priorityDot: Record<string, string> = {
  alta: 'bg-white/40',
  media: 'bg-white/20',
  bassa: 'bg-white/10',
}

const SmartListItem = memo(function SmartListItem({
  item,
  index,
  itemRef,
}: {
  item: ListItem
  index: number
  itemRef: (el: HTMLDivElement | null) => void
}) {
  return (
    <div
      ref={itemRef}
      data-id={item.id}
      className="absolute left-0 right-0 flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.03] px-4"
      style={{
        height: `${ITEM_HEIGHT}px`,
        transform: `translateY(${index * (ITEM_HEIGHT + GAP)}px)`,
        willChange: 'transform, opacity',
      }}
    >
      <div className="flex items-center gap-3">
        <div className={`h-1.5 w-1.5 rounded-full ${priorityDot[item.priority]}`} />
        <span className="text-[13px] text-white/60">{item.label}</span>
      </div>
      <span className="font-mono text-[11px] text-white/30">{item.metric}</span>
    </div>
  )
})

export default function SmartListCard() {
  const [order, setOrder] = useState<ListItem[]>(ITEMS)
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isAnimating = useRef(false)

  const setItemRef = useCallback(
    (id: string) => (el: HTMLDivElement | null) => {
      if (el) {
        itemRefs.current.set(id, el)
      } else {
        itemRefs.current.delete(id)
      }
    },
    []
  )

  const shuffle = useCallback(() => {
    if (isAnimating.current) return
    isAnimating.current = true

    setOrder((prev) => {
      const next = [...prev]
      const last = next.pop()!
      next.unshift(last)

      requestAnimationFrame(() => {
        const els = itemRefs.current

        const promotedEl = els.get(last.id)
        if (promotedEl) {
          gsap.fromTo(
            promotedEl,
            { y: -(ITEM_HEIGHT + GAP), opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
              ease: 'power3.out',
              onComplete: () => {
                isAnimating.current = false
              },
            }
          )
        }

        next.forEach((item, i) => {
          if (item.id === last.id) return
          const el = els.get(item.id)
          if (el) {
            gsap.to(el, {
              y: i * (ITEM_HEIGHT + GAP),
              duration: 0.45,
              ease: 'power3.out',
            })
          }
        })
      })

      return next
    })
  }, [])

  useEffect(() => {
    intervalRef.current = setInterval(shuffle, CYCLE_INTERVAL)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [shuffle])

  const totalHeight = ITEMS.length * ITEM_HEIGHT + (ITEMS.length - 1) * GAP

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <span className="text-[11px] font-medium uppercase tracking-wider text-white/25">
            Priorita
          </span>
          <span className="font-mono text-[10px] text-white/15">live</span>
        </div>

        {/* List */}
        <div className="relative" style={{ height: `${totalHeight}px` }}>
          {order.map((item, i) => (
            <SmartListItem
              key={item.id}
              item={item}
              index={i}
              itemRef={setItemRef(item.id)}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 border-t border-white/[0.04] pt-3">
          <span className="text-[11px] text-white/15">5 task attivi</span>
        </div>
      </div>
    </div>
  )
}

interface Props {
  params: {
    categoryId: string
  }
}

export default function CategoryDetailPage({ params }: Props) {
  return <div>CategoryDetailPage {params.categoryId}</div>
}

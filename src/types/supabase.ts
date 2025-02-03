export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      category: {
        Row: {
          color: string
          created_at: string
          icon: string
          id: string
          name: string
          updated_at: string
          user_id: string
          word_count: number | null
        }
        Insert: {
          color: string
          created_at?: string
          icon: string
          id?: string
          name: string
          updated_at?: string
          user_id: string
          word_count?: number | null
        }
        Update: {
          color?: string
          created_at?: string
          icon?: string
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'fk_auth_user'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profile'
            referencedColumns: ['id']
          },
        ]
      }
      profile: {
        Row: {
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          nickname: string | null
          profile_img: string | null
        }
        Insert: {
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          nickname?: string | null
          profile_img?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          nickname?: string | null
          profile_img?: string | null
        }
        Relationships: []
      }
      word: {
        Row: {
          category_id: string
          created_at: string
          examples: string[] | null
          id: string
          ipa: string | null
          is_marked: boolean | null
          memo: string | null
          updated_at: string
          word: string
        }
        Insert: {
          category_id: string
          created_at?: string
          examples?: string[] | null
          id?: string
          ipa?: string | null
          is_marked?: boolean | null
          memo?: string | null
          updated_at?: string
          word: string
        }
        Update: {
          category_id?: string
          created_at?: string
          examples?: string[] | null
          id?: string
          ipa?: string | null
          is_marked?: boolean | null
          memo?: string | null
          updated_at?: string
          word?: string
        }
        Relationships: [
          {
            foreignKeyName: 'word_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'category'
            referencedColumns: ['id']
          },
        ]
      }
      word_definition: {
        Row: {
          definition: string
          definition_order: number
          id: string
          is_jargon: boolean | null
          word_id: string | null
        }
        Insert: {
          definition: string
          definition_order: number
          id?: string
          is_jargon?: boolean | null
          word_id?: string | null
        }
        Update: {
          definition?: string
          definition_order?: number
          id?: string
          is_jargon?: boolean | null
          word_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'word_definition_word_id_fkey'
            columns: ['word_id']
            isOneToOne: false
            referencedRelation: 'word'
            referencedColumns: ['id']
          },
        ]
      }
      word_link: {
        Row: {
          created_at: string
          id: string
          link_type_id: number
          linked_word_id: string | null
          text_value: string | null
          word_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          link_type_id: number
          linked_word_id?: string | null
          text_value?: string | null
          word_id: string
        }
        Update: {
          created_at?: string
          id?: string
          link_type_id?: number
          linked_word_id?: string | null
          text_value?: string | null
          word_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'fk_word_relation_word'
            columns: ['word_id']
            isOneToOne: false
            referencedRelation: 'word'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'word_link_link_type_id_fkey'
            columns: ['link_type_id']
            isOneToOne: false
            referencedRelation: 'word_link_type'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'word_link_linked_word_id_fkey'
            columns: ['linked_word_id']
            isOneToOne: false
            referencedRelation: 'word'
            referencedColumns: ['id']
          },
        ]
      }
      word_link_type: {
        Row: {
          color: string | null
          created_at: string
          id: number
          name: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_word: {
        Args: {
          p_word_data: Json
        }
        Returns: Json
      }
      fetch_words: {
        Args: {
          user_id: string
          order_by_column: string
          is_ascending: boolean
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
  ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
  : never

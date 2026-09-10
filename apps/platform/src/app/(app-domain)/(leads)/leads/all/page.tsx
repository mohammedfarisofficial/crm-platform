"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { CreateLeadModal } from '@/modules/app-domain/leads/modals';
import { useAuth } from '@crm/composables/authentication/context';
import { fetchClient as apiFetch } from '@crm/composables/authentication/functions';
import { API_BASE, VERSION, SERVICES, ENDPOINTS } from '@crm/utils/constants/endpoints';
import {
  Pagination,
  Spinner,
  Chip
} from '@heroui/react';

const LEADS_URL = `${API_BASE}${VERSION.V2}${SERVICES.BRANDS}${ENDPOINTS.BRANDS.GET_ALL_LEADS}`;

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: number;
  source: number;
  created_at: string;
}

const columns = [
  { key: "name", label: "NAME" },
  { key: "email", label: "EMAIL" },
  { key: "phone", label: "PHONE" },
  { key: "status", label: "STATUS" },
  { key: "created_at", label: "CREATED" }
];

interface LeadsResponse {
  data: Lead[];
  meta: {
    totalPages: number;
    total: number;
    page: number;
    limit: number;
  };
}

export default function AllLeadsPage() {
  const { user } = useAuth();
  
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const rowsPerPage = 10;

  const fetchLeads = async (currentPage: number) => {
    if (!user?.brand?.brand_id) return;
    
    setIsLoading(true);
    try {
      const response = await apiFetch<LeadsResponse>(`${LEADS_URL}?brand_id=${user.brand.brand_id}&page=${currentPage}&limit=${rowsPerPage}`, {
        method: 'GET',
        secure: true,
      });
      
      if (response && response.data) {
        setLeads(response.data);
        if (response.meta) {
          setTotalPages(response.meta.totalPages || 1);
        }
      }
    } catch (error) {
      console.error("Failed to fetch leads", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads(page);
  }, [page, user?.brand?.brand_id]);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">All Leads</h1>
          <CreateLeadModal />
        </div>
      </div>
    );
  }, []);

  const bottomContent = useMemo(() => {
    return totalPages > 1 ? (
      <div className="flex w-full justify-center">
        <Pagination size="sm">
          <Pagination.Content className="gap-1 rounded-xl bg-default p-1">
            <Pagination.Item>
              <Pagination.Previous
                isDisabled={page === 1}
                onPress={() => setPage((p) => p - 1)}
              >
                <Pagination.PreviousIcon />
              </Pagination.Previous>
            </Pagination.Item>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Pagination.Item key={p}>
                <Pagination.Link
                  isActive={p === page}
                  onPress={() => setPage(p)}
                >
                  {p}
                </Pagination.Link>
              </Pagination.Item>
            ))}
            <Pagination.Item>
              <Pagination.Next
                isDisabled={page === totalPages}
                onPress={() => setPage((p) => p + 1)}
              >
                <Pagination.NextIcon />
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      </div>
    ) : null;
  }, [page, totalPages]);

  const renderCell = (lead: Lead, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return `${lead.first_name} ${lead.last_name}`;
      case "email":
        return lead.email;
      case "phone":
        return lead.phone;
      case "status":
        return (
          <Chip size="sm" variant="soft" color={lead.status === 1 ? "success" : "default"}>
            {lead.status === 1 ? "Active" : "Inactive"}
          </Chip>
        );
      case "created_at":
        return new Date(lead.created_at).toLocaleDateString();
      default:
        return null;
    }
  };

  if (!isMounted) return null;

  return (
    <div className="p-6 h-full flex flex-col gap-4">
      {topContent}
      
      <div className="flex-grow">
        <div className="flex flex-col relative w-full h-full min-h-[400px] overflow-x-auto bg-content1 shadow-small rounded-large p-4">
          <table className="w-full h-auto text-left min-w-max">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="bg-default-100 text-default-500 font-semibold text-xs h-10 px-4 first:rounded-l-lg last:rounded-r-lg uppercase tracking-wider"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length} className="h-40 text-center">
                    <Spinner />
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="h-40 text-center text-default-500 text-sm">
                    No leads found.
                  </td>
                </tr>
              ) : (
                leads.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-default-100 hover:bg-default-50 transition-colors"
                  >
                    {columns.map((column) => (
                      <td key={column.key} className="px-4 py-3 text-sm">
                        {renderCell(item, column.key)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {bottomContent}
    </div>
  );
}

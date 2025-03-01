select e.id as employee_id, 
e.nik, e.name, 
e.is_active, 
ep.gender, 
concat(extract(year from AGE(ep.date_of_birth)), ' Years Old') as age, 
ed.name as school_name, 
ed.level,
  CONCAT(
  	CASE 
      WHEN COUNT(CASE WHEN ef.relation_status = 'Suami' THEN 1 END) > 0 
      THEN COUNT(CASE WHEN ef.relation_status = 'Suami' THEN 1 END) || ' Suami' 
      ELSE '' 
    END,
    CASE 
      WHEN COUNT(CASE WHEN ef.relation_status = 'Istri' THEN 1 END) > 0 
      THEN COUNT(CASE WHEN ef.relation_status = 'Istri' THEN 1 END) || ' Istri' 
      ELSE '' 
    END,
    CASE 
      WHEN COUNT(CASE WHEN ef.relation_status = 'Anak' THEN 1 END) > 0 
      THEN CASE 
          WHEN COUNT(CASE WHEN ef.relation_status = 'Suami' THEN 1 END) > 0 OR COUNT(CASE WHEN ef.relation_status = 'Istri' THEN 1 END) > 0 THEN ' & ' 
          ELSE '' 
        END || COUNT(CASE WHEN ef.relation_status = 'Anak' THEN 1 END) || ' Anak' 
      ELSE '' 
    END,
    CASE 
      WHEN COUNT(CASE WHEN ef.relation_status = 'Anak Sambung' THEN 1 END) > 0 
      THEN CASE 
          WHEN COUNT(CASE WHEN ef.relation_status = 'Suami' THEN 1 END) > 0 OR COUNT(CASE WHEN ef.relation_status = 'Istri' THEN 1 END) > 0 OR COUNT(CASE WHEN ef.relation_status = 'Anak' THEN 1 END) > 0 THEN ' & ' 
          ELSE '' 
        END || COUNT(CASE WHEN ef.relation_status = 'Anak Sambung' THEN 1 END) || ' Anak Sambung' 
      ELSE '' 
    end,
    CASE 
      WHEN COUNT(CASE WHEN ef.relation_status = 'Suami' THEN 1 END) = 0 AND COUNT(CASE WHEN ef.relation_status = 'Istri' THEN 1 END) = 0 AND COUNT(CASE WHEN ef.relation_status = 'Anak' THEN 1 END) = 0 AND COUNT(CASE WHEN ef.relation_status = 'Anak Sambung' THEN 1 END) = 0
      THEN '-'
      ELSE '' 
    END
  ) AS family_data
from employee e
left join employee_profile ep on ep.employee_id = e.id 
left join education ed on ed.employee_id = e.id
left join employee_family ef on ef.employee_id = e.id
group by e.id, e.nik, e.is_active, ep.gender, ep.date_of_birth, ed.name, ed.level;